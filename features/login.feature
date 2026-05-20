Feature: verify login

  Background:
    Given I navigate to "https://app-uat.codereview.allence.cloud/auth/login"

  Scenario: verify user is able to navigate with valid credentials
    When I enter my email "seifeddinejemai@gmail.com"
    And I enter my password "sei756"
    And I click the button login
    Then I should see "Suivi et gestion en temps réel des equipes"

  Scenario Outline: Verify user is able to login with invalid credentials
    When I enter my email "<email>"
    And I enter my password "<password>"
    And I click the button login
    Then I should see "<msgErr>"

    Examples:
      | email                     | password | msgErr                      |
      | seifeddinejemai@gmail.com | sei7     | Identifiants invalides.     |
      | seifeddine@gmail.com      | sei756   | L'utilisateur n'existe pas. |
      | seifeddinejemai@gmail.com |          | Le mot de passe requis.     |
      |                           | sei756   | E-mail requis.              |
