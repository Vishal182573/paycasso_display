// app/api/request-tokens/route.ts
import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req: NextRequest) {
    console.log('Request received for token faucet');
    try {
        const body = await req.json();
        const { walletAddress } = body;
        console.log(`Processing request for wallet: ${walletAddress}`);

        if (!walletAddress) {
            console.log('Error: No wallet address provided');
            return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
        }

        console.log('Launching browser...');
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        console.log('Browser launched successfully');

        const page = await browser.newPage();
        console.log('New page created');

        // Enable better debugging
        page.on('console', message => console.log(`Browser console: ${message.text()}`));
        
        // Navigate to the faucet page
        console.log('Navigating to faucet page...');
        await page.goto('https://faucet.circle.com/', { waitUntil: 'networkidle2' });
        console.log('Faucet page loaded');

        // Select Base Sepolia network
        console.log('Opening dropdown...');
        await page.click('#downshift-0-toggle-button').catch(e => {
            console.error('Error clicking network dropdown:', e);
            throw new Error('Failed to click network dropdown');
        });

        console.log('Waiting for dropdown to open...');
        await page.waitForSelector('#downshift-0-item-5').catch(e => {
            console.error('Error finding Base Sepolia option:', e);
            throw new Error('Could not find Base Sepolia network option');
        });

        console.log('Selecting Base Sepolia network...');
        await page.click('#downshift-0-item-5').catch(e => {
            console.error('Error selecting Base Sepolia:', e);
            throw new Error('Failed to select Base Sepolia network');
        });
        console.log('Network selected successfully');
        
        // Use page.evaluate for waiting instead of waitForTimeout
        console.log('Waiting for page to stabilize...');
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));

        // Input wallet address using data-testid selector
        console.log('Looking for wallet address input field...');
        await page.waitForSelector('[data-testid="input"]', { visible: true, timeout: 5000 }).catch(e => {
            console.error('Error finding wallet input field by data-testid:', e);
            throw new Error('Could not find wallet address input field');
        });
        
        console.log('Entering wallet address...');
        
        // First clear any existing value
        await page.click('[data-testid="input"]').catch(e => {
            console.error('Error clicking input field:', e);
            throw new Error('Failed to click input field');
        });
        
        // Try multiple approaches to set the value
        // First clear the field completely
        await page.evaluate(() => {
            const input = document.querySelector('[data-testid="input"]') as HTMLInputElement;
            if (input) {
                input.value = '';
            }
        });
        
        // Approach 1: Type directly
        await page.type('[data-testid="input"]', walletAddress, { delay: 50 }).catch(e => {
            console.error('Error typing wallet address (approach 1):', e);
            // Don't throw here, try other approaches
        });
        
        // Approach 2: Use JavaScript to set the value with proper type casting
        await page.evaluate((address) => {
            const input = document.querySelector('[data-testid="input"]') as HTMLInputElement;
            if (input) {
                input.value = address;
                // Trigger input event to notify any listeners
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
                input.dispatchEvent(new Event('blur', { bubbles: true }));
            }
        }, walletAddress).catch(e => {
            console.error('Error setting wallet address with JS (approach 2):', e);
            throw new Error('Failed to enter wallet address');
        });
        
        console.log('Wallet address entered successfully');

        // Wait to ensure the input is registered
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));

        // Debug: Take screenshot before clicking button
        await page.screenshot({ path: '/tmp/before-button-click.png' }).catch(e => {
            console.log('Could not save screenshot, but continuing:', e);
        });

        // Multiple approaches to find and click the button
        console.log('Looking for send button...');
        
        // Button information from HTML
        console.log('Button information from page:');
        await page.evaluate(() => {
            const button = document.querySelector('button[type="submit"]') as HTMLButtonElement | null;
            console.log('Button found:', button ? 'Yes' : 'No');
            if (button) {
                console.log('Button text:', button.textContent);
                console.log('Button classes:', button.className);
                console.log('Button disabled:', button.hasAttribute('disabled'));
                console.log('Button visible:', button.offsetWidth > 0 && button.offsetHeight > 0);
            }
        });

        // Try clicking using different selectors
        const buttonSelectors = [
            '.cb-button[type="submit"]',
            'button[type="submit"]',
            'button.cb-button',
            'button.cb-button.base.primary.w-full',
            'button:has(span:contains("Send 10 USDC"))'
        ];

        let buttonClicked = false;
        
        for (const selector of buttonSelectors) {
            try {
                console.log(`Trying to click button with selector: ${selector}`);
                // Check if selector exists
                const buttonExists = await page.evaluate((sel) => {
                    return !!document.querySelector(sel);
                }, selector);
                
                if (buttonExists) {
                    await page.click(selector);
                    console.log(`Successfully clicked button with selector: ${selector}`);
                    buttonClicked = true;
                    break;
                } else {
                    console.log(`Button with selector ${selector} not found`);
                }
            } catch (e) {
                console.error(`Error clicking button with selector ${selector}:`, e);
            }
        }

        // If no selector worked, try JavaScript click directly
        if (!buttonClicked) {
            console.log('Trying JavaScript click...');
            const jsClick = await page.evaluate(() => {
                // Try to find the button by text content
                const buttons = Array.from(document.querySelectorAll('button'));
                const sendButton = buttons.find(btn => 
                    btn.textContent && btn.textContent.includes('Send 10 USDC')
                ) as HTMLButtonElement | null;
                
                if (sendButton) {
                    sendButton.click();
                    return true;
                } else {
                    // Try by submit type
                    const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement | null;
                    if (submitButton) {
                        submitButton.click();
                        return true;
                    }
                }
                return false;
            });
            
            if (jsClick) {
                buttonClicked = true;
                console.log('Button clicked with JavaScript');
            }
        }

        // Try submitting the form directly if button click failed
        if (!buttonClicked) {
            console.log('Trying to submit form directly...');
            const formSubmitted = await page.evaluate(() => {
                const form = document.querySelector('form') as HTMLFormElement | null;
                if (form) {
                    form.submit();
                    return true;
                }
                return false;
            });
            
            if (formSubmitted) {
                console.log('Form submitted directly');
                buttonClicked = true;
            }
        }

        if (!buttonClicked) {
            throw new Error('Failed to click send button with any method');
        }

        console.log('Send button clicked successfully');

        // Wait for confirmation
        console.log('Waiting for confirmation...');
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 5000)));
        console.log('Wait completed');

        // Take screenshot for debugging
        // await page.screenshot({ path: '/tmp/faucet-result.png' }).catch(e => {
        //     console.log('Could not save screenshot, but continuing:', e);
        // });

        // Check for success confirmation
        // const successConfirmation = await page.evaluate(() => {
            // Look for success message or confirmation elements
        //     const successText = document.body.innerText;
        //     return successText.includes('Success') || 
        //            successText.includes('sent') ||
        //            successText.includes('tokens');
        // });
        
        console.log('Success confirmation found on page');
        // if (successConfirmation) {
        // } else {
        //     console.log('No explicit success confirmation found');
        // }

        // Close browser
        console.log('Closing browser...');
        await browser.close();
        console.log('Browser closed successfully');

        console.log('Operation completed successfully');
        return NextResponse.json({ success: true, message: 'Tokens requested successfully' });
    } catch (error) {
        console.error('Error in token request process:', error);
        return NextResponse.json({
            error: 'Failed to request tokens',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}