Feature: verify login

Scenario: verify user is able to navigate with valid credentials
  Given I navigate to "https://app-uat.codereview.allence.cloud/auth/login"
  When I enter my email "seifeddinejemai@gmail.com"
  And I enter my password "sei756"
  And I click the button login
  Then I should see "Suivi et gestion en temps réel des equipes"