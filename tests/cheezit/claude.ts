// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/junit-results.xml' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  use: {
    baseURL: 'https://www.cheezit.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});

// tests/fixtures/base-page.ts
import { test as base, Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.baseURL = 'https://www.cheezit.com';
  }

  async goto(path: string = '/en-us/home.html'): Promise<void> {
    await this.page.goto(`${this.baseURL}${path}`);
  }

  async acceptCookies(): Promise<void> {
    try {
      const cookieButton = this.page.locator('[data-testid="cookie-accept"], .cookie-accept, button:has-text("Accept")').first();
      await cookieButton.waitFor({ timeout: 5000 });
      await cookieButton.click();
    } catch (error) {
      console.log('No cookie banner found or already accepted');
    }
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}

export class HomePage extends BasePage {
  readonly heroSection: string;
  readonly productTiles: string;
  readonly navigation: string;
  readonly logo: string;
  readonly searchInput: string;

  constructor(page: Page) {
    super(page);
    this.heroSection = 'section[data-testid="hero"], .hero-section, .main-banner';
    this.productTiles = '[href*="/products/"], .product-tile, .product-card';
    this.navigation = 'nav, .navigation, .main-menu';
    this.logo = 'img[alt*="Cheez"], .logo, [data-testid="logo"]';
    this.searchInput = 'input[type="search"], [placeholder*="search"], .search-input';
  }

  async getProductTiles(): Promise<Locator[]> {
    return await this.page.locator(this.productTiles).all();
  }

  async clickProduct(productName: string): Promise<void> {
    await this.page.locator(`text=${productName}`).first().click();
  }

  getLogoLocator(): Locator {
    return this.page.locator(this.logo).first();
  }

  getNavigationLocator(): Locator {
    return this.page.locator(this.navigation).first();
  }
}

export class ProductPage extends BasePage {
  readonly productTitle: string;
  readonly productImage: string;
  readonly productDescription: string;
  readonly nutritionInfo: string;
  readonly ingredientsList: string;

  constructor(page: Page) {
    super(page);
    this.productTitle = 'h1, .product-title, [data-testid="product-title"]';
    this.productImage = '.product-image img, .hero-image img';
    this.productDescription = '.product-description, .product-details';
    this.nutritionInfo = '.nutrition, [data-testid="nutrition"]';
    this.ingredientsList = '.ingredients, [data-testid="ingredients"]';
  }

  getProductTitleLocator(): Locator {
    return this.page.locator(this.productTitle).first();
  }

  getProductImageLocator(): Locator {
    return this.page.locator(this.productImage).first();
  }
}

// Test fixtures with TypeScript typing
interface TestFixtures {
  homePage: HomePage;
  productPage: ProductPage;
}

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  }
});

export { expect } from '@playwright/test';

// tests/utils/test-data.ts
interface ProductUrls {
  original: string;
  extra: string;
  snapd: string;
  duoz: string;
  snackMix: string;
  grooves: string;
  puffd: string;
  multipacks: string;
  varietyPacks: string;
}

interface TestUrls {
  home: string;
  products: ProductUrls;
}

interface TestData {
  products: string[];
  urls: TestUrls;
}

export const testData: TestData = {
  products: [
    'Original',
    'Extra Toasty', 
    'White Cheddar',
    'Snap\'d',
    'Duoz',
    'Snack Mix',
    'Grooves',
    'Puff\'d'
  ],
  urls: {
    home: '/en-us/home.html',
    products: {
      original: '/en-us/products/baked-snack-crackers.html',
      extra: '/en-us/products/extra.html',
      snapd: '/en-us/products/snapd.html',
      duoz: '/en-us/products/duoz.html',
      snackMix: '/en-us/products/snackmix.html',
      grooves: '/en-us/products/grooves.html',
      puffd: '/en-us/products/puffd.html',
      multipacks: '/en-us/products/multipacks.html',
      varietyPacks: '/en-us/products/variety-packs.html'
    }
  }
};

// tests/utils/helpers.ts
import { Page } from '@playwright/test';

interface PerformanceMetrics {
  domContentLoaded: number;
  loadComplete: number;
  firstPaint: number;
  firstContentfulPaint: number;
}

export class TestHelpers {
  static async waitForImages(page: Page, selector: string = 'img'): Promise<void> {
    await page.waitForFunction((sel: string) => {
      const images = Array.from(document.querySelectorAll(sel)) as HTMLImageElement[];
      return images.every(img => img.complete && img.naturalHeight !== 0);
    }, selector);
  }

  static async checkAccessibility(page: Page): Promise<string[]> {
    const issues: string[] = [];
    
    // Check for alt text on images
    const imagesWithoutAlt = await page.locator('img:not([alt])').count();
    if (imagesWithoutAlt > 0) {
      issues.push(`${imagesWithoutAlt} images missing alt text`);
    }

    // Check for proper heading structure
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    if (headings.length === 0) {
      issues.push('No headings found on page');
    }

    return issues;
  }

  static async checkPerformance(page: Page): Promise<PerformanceMetrics> {
    const performanceMetrics = await page.evaluate((): PerformanceMetrics => {
      const perf = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType('paint') as PerformancePaintTiming[];
      
      return {
        domContentLoaded: perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart,
        loadComplete: perf.loadEventEnd - perf.loadEventStart,
        firstPaint: paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
      };
    });
    
    return performanceMetrics;
  }

  static async getBrokenImageCount(page: Page): Promise<number> {
    return await page.locator('img').evaluateAll((images: HTMLImageElement[]) => 
      images.filter(img => !img.complete || img.naturalHeight === 0).length
    );
  }
}

// tests/home-page.spec.ts
import { test, expect } from './fixtures/base-page';
import { testData } from './utils/test-data';
import { TestHelpers } from './utils/helpers';

test.describe('Cheez-It Homepage Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
    await homePage.acceptCookies();
    await homePage.waitForPageLoad();
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Cheez/i);
    await expect(page).toHaveURL(/cheezit\.com/);
  });

  test('should display main logo', async ({ homePage }) => {
    const logo = homePage.getLogoLocator();
    await expect(logo).toBeVisible();
  });

  test('should display product tiles', async ({ homePage }) => {
    const productTiles = await homePage.getProductTiles();
    expect(productTiles.length).toBeGreaterThan(0);
    
    // Check that each tile is visible and has expected content
    for (const tile of productTiles.slice(0, 3)) {
      await expect(tile).toBeVisible();
    }
  });

  test('should have working navigation', async ({ homePage }) => {
    const navigation = homePage.getNavigationLocator();
    await expect(navigation).toBeVisible();
  });

  test('should load all images successfully', async ({ page }) => {
    await TestHelpers.waitForImages(page);
    
    const brokenImageCount = await TestHelpers.getBrokenImageCount(page);
    expect(brokenImageCount).toBe(0);
  });

  test('should be responsive on mobile', async ({ page, homePage }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await homePage.waitForPageLoad();
    
    const logo = homePage.getLogoLocator();
    await expect(logo).toBeVisible();
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });
});

// tests/product-pages.spec.ts
import { test, expect } from './fixtures/base-page';
import { testData } from './utils/test-data';

test.describe('Product Pages Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.cheezit.com');
  });

  Object.entries(testData.urls.products).forEach(([productKey, url]) => {
    test(`should load ${productKey} product page`, async ({ page, productPage }) => {
      await productPage.goto(url);
      await productPage.waitForPageLoad();
      
      // Check page loads successfully
      await expect(page).toHaveURL(new RegExp(url));
      
      // Check for product title
      const title = productPage.getProductTitleLocator();
      await expect(title).toBeVisible();
      
      // Check for product image
      const productImage = productPage.getProductImageLocator();
      await expect(productImage).toBeVisible();
    });
  });

  test('should navigate from homepage to product page', async ({ page, homePage, productPage }) => {
    await homePage.goto();
    await homePage.acceptCookies();
    
    // Click on first product tile
    const firstProductTile = page.locator(homePage.productTiles).first();
    await firstProductTile.click();
    
    // Should navigate to product page
    await productPage.waitForPageLoad();
    await expect(page).toHaveURL(/\/products\//);
  });
});

// tests/accessibility.spec.ts
import { test, expect } from './fixtures/base-page';
import { TestHelpers } from './utils/helpers';

test.describe('Accessibility Tests', () => {
  test('homepage should meet basic accessibility standards', async ({ page, homePage }) => {
    await homePage.goto();
    await homePage.acceptCookies();
    await homePage.waitForPageLoad();
    
    const accessibilityIssues = await TestHelpers.checkAccessibility(page);
    
    // Log issues for debugging but don't fail the test unless critical
    if (accessibilityIssues.length > 0) {
      console.log('Accessibility issues found:', accessibilityIssues);
    }
    
    // Ensure at least basic structure exists
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').count();
    expect(headings).toBeGreaterThan(0);
  });

  test('should be keyboard navigable', async ({ page, homePage }) => {
    await homePage.goto();
    await homePage.acceptCookies();
    
    // Tab through focusable elements
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus').first();
    await expect(focusedElement).toBeVisible();
  });
});

// tests/performance.spec.ts
import { test, expect } from './fixtures/base-page';
import { TestHelpers } from './utils/helpers';

test.describe('Performance Tests', () => {
  test('homepage should load within acceptable time', async ({ page, homePage }) => {
    const startTime = Date.now();
    await homePage.goto();
    await homePage.waitForPageLoad();
    const loadTime = Date.now() - startTime;
    
    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have good performance metrics', async ({ page, homePage }) => {
    await homePage.goto();
    await homePage.waitForPageLoad();
    
    const metrics = await TestHelpers.checkPerformance(page);
    
    // Basic performance assertions
    expect(metrics.firstContentfulPaint).toBeGreaterThan(0);
    expect(metrics.firstContentfulPaint).toBeLessThan(3000); // 3 seconds
  });
});

// tests/cross-browser.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Cross-browser Compatibility', () => {
  (['chromium', 'firefox', 'webkit'] as const).forEach(browserName => {
    test(`should work correctly on ${browserName}`, async ({ page }) => {
      await page.goto('https://www.cheezit.com/en-us/home.html');
      await page.waitForLoadState('networkidle');
      
      // Basic functionality should work across all browsers
      await expect(page).toHaveTitle(/Cheez/i);
      
      const productTiles = page.locator('[href*="/products/"]');
      const count = await productTiles.count();
      expect(count).toBeGreaterThan(0);
    });
  });
});

// package.json
/*
{
  "name": "cheezit-playwright-tests",
  "version": "1.0.0",
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "test:report": "playwright show-report",
    "test:codegen": "playwright codegen https://www.cheezit.com"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
*/

// tsconfig.json
/*
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "module": "commonjs",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "outDir": "./dist",
    "rootDir": "./",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./tests/*"]
    }
  },
  "include": [
    "tests/**/*",
    "playwright.config.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "test-results"
  ]
}
*/