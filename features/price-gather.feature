Feature: Get ETF prices from vendor site periodically.
    As a user, I would like my portfolio calculations to use up-to-date pricing

Scenario: up to date prices
  Given I visit www.wealthapi.com
  When I enter my portfolio securities with weights
  Then I should have return and risk analysis done with most up to date EOD prices

Scenario: price not extracted
  Given As an admin user, I visit admin.wealthapi.com
  When I see etf prices stats
  Then I see a warning indicating price extraction did not complete