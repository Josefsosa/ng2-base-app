'use strict';

describe('TC_Web_HeaderFooterValidate', function() {
    browser.manage().window().maximize();
    beforeEach(function() {
        browser.ignoreSynchronization = true;
        let driver = browser.driver
    });
    it('OPEN_WEB_URL', function() {
        let driver = browser.driver
        try {
            driver.get('http://127.0.0.1:9000/')
            driver.sleep(5000)
            driver.sleep(5000)
            console.log('TS 02::PASS----Landing page opened');
        } catch (err) {
            expect(err.name).toBe('err is not defined')
        }
    });
    it('VERIFY_HEADER_LINKS', function () {
        try {
            let driver = browser.driver
            driver.findElement(by.xpath(".//*[@id='navbar']/ul/li[1]/a"))
            expect(element(by.xpath(".//*[@id='navbar']/ul/li[1]/a")).isDisplayed()).toBe(true)
            let actionText = element(by.xpath(".//*[@id='navbar']/ul/li[1]/a")).getText()
            actionText.then(function (text) {
                if (text == 'Prepaid |') {
                    console.log('TS 03::PASS----Text of the the  object verified and was correct');
                } else {
                    driver.sleep(5000)
                    console.log('TS 03::FAIL------Text of the the  object   container ng-binding ng-scope  verified and was not correct-----');
                }
            }, function (err) {
                console.log('ELement Not Found fsfsfson the Page');
            });
        } catch (err) {
            expect(err.name).toBe('err is not defined')
        }
    });
});