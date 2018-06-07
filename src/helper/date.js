export default class DateHelper {
  /**
   * Return Date from the expiration card format
   * @param expirationDate
   * @returns {Date}
   */
  static getDateFromExpirationDateCard(expirationDate: string): Date {
    const [month, year] = expirationDate.split('/');
    const cardExpirationDate = new Date();
    cardExpirationDate.setFullYear(parseInt(year, 10), parseInt(month, 10), 1);

    return cardExpirationDate;
  }
}
