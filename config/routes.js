/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /**
   * Auth
   */
  'POST /login': { action: 'auth/login' },
  'GET /logout': { action: 'auth/logout' },

  /**
   * Private
   */
  'GET /companies': 'private/CompanyController.all',
  'GET /companies-list': 'private/CompanyController.list',
  'GET /company/:id': 'private/CompanyController.find',
  'POST /company/store': 'private/CompanyController.store',
  'POST /company/update/:id': 'private/CompanyController.update',
  'POST /company/destroy': 'private/CompanyController.destroy',

  'GET /bank-accounts': 'private/BankAccountController.list',
  'GET /bank-account/:id': 'private/BankAccountController.find',
  'GET /bank-account/code-types': 'private/BankAccountController.codeTypes',
  'POST /bank-account/store': 'private/BankAccountController.store',
  'POST /bank-account/update/:id': 'private/BankAccountController.update',
  'POST /bank-account/destroy': 'private/BankAccountController.destroy',

  'GET /documents': 'private/DocumentController.list',
  'GET /document/types': 'private/DocumentController.types',
  'GET /document/:id': 'private/DocumentController.find',
  'POST /document/store': 'private/DocumentController.store',
  'POST /document/update/:id': 'private/DocumentController.update',
  'POST /document/destroy': 'private/DocumentController.destroy',

  // 'GET /transactions': 'private/TransactionController.list',
  'POST /transactions': 'private/TransactionController.search',
  'GET /transaction/:id': 'private/TransactionController.find',
  'POST /transaction/store': 'private/TransactionController.store',
  'POST /transaction/update/:id': 'private/TransactionController.update',
  'POST /transaction/destroy': 'private/TransactionController.destroy',

  'GET /currencies': 'private/CurrencyController.list',

};
