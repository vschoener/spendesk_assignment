export default class DateHelper {
  static getDateFromExpirationDateCard(expirationDate: string) {
    const [month, year] = expirationDate.split('/');
    const cardExpirationDate = new Date();
    cardExpirationDate.setFullYear(parseInt(year, 10), parseInt(month, 10), 1);

    return cardExpirationDate;
  }
}
