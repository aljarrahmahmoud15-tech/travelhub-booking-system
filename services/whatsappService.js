const { getClient, getStatus } = require('../config/whatsapp');

const whatsappService = {
  async initialize() {
    return getClient();
  },

  async sendMessage(phone, message) {
    try {
      if (!phone) return null;
      const client = getClient();
      if (!client || !getStatus().ready) {
        console.log('⚠️ WhatsApp not ready yet. Message queued or skipped.');
        return null;
      }
      const cleanNumber = phone.toString().replace(/\D/g, '');
      const formattedNumber = `${cleanNumber}@c.us`;
      await client.sendMessage(formattedNumber, message);
      return true;
    } catch (error) {
      console.error('WhatsApp send error:', error.message);
      return false;
    }
  },

  async sendBookingMessage({ customerName, customerPhone, bookingCode, tripType, routeFrom, routeTo, date, time, amount }) {
    const text = `
🚐 TravelHub Booking

اسم العميل: ${customerName}
رقم الهاتف: ${customerPhone}
رمز الحجز: ${bookingCode}
نوع الرحلة: ${tripType}
من: ${routeFrom}
إلى: ${routeTo}
التاريخ: ${date}
الوقت: ${time || 'غير محدد'}
المبلغ: ${amount || 0} ر.س

تم تأكيد الحجز بنجاح.
    `;

    return this.sendMessage(customerPhone, text);
  }
};

module.exports = whatsappService;
