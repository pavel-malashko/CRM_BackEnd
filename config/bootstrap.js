/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.

  if (await User.count() > 0) {
    return;
  }

  await User.createEach([
    { email: 'admin@bfb.by', name: 'Administrator', password: AuthService.encryptPassword('admin1234') },
  ]);

  await sails.sendNativeQuery(`CREATE OR REPLACE VIEW transaction_view AS
    SELECT transaction.id, purpose, amount, currency.id AS currency_id, currency.name AS currency_name,
      fromAccount.id AS fromAccount_id, fromAccount.iban AS fromAccount_iban, fromCompany.id AS fromAccount_company_id, fromCompany.name AS fromAccount_company_name,
      toAccount.id AS toAccount_id, toAccount.iban AS toAccount_iban, toCompany.id AS toAccount_company_id, toCompany.name AS toAccount_company_name
    FROM transaction
    LEFT JOIN currency ON currency.id = transaction.currency
    LEFT JOIN bank_account AS fromAccount ON fromAccount.id = transaction.fromAccount
    LEFT JOIN bank_account AS toAccount ON toAccount.id = transaction.toAccount
    LEFT JOIN company AS fromCompany ON fromCompany.id = fromAccount.company
    LEFT JOIN company AS toCompany ON toCompany.id = toAccount.company;
  `);

};
