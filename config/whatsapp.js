const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

let client = null;
let isReady = false;

const initialize = async () => {
  try {
    client = new Client({
      authStrategy: new LocalAuth({ dataPath: process.env.SESSION_PATH || './session' }),
      puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      }
    });

    client.on('qr', (qr) => {
      console.log('📲 Scan this QR code with WhatsApp:');
      qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
      isReady = true;
      console.log('✅ WhatsApp client is ready');
    });

    client.on('auth_failure', (msg) => {
      console.error('❌ WhatsApp auth failure:', msg);
    });

    client.on('disconnected', (reason) => {
      isReady = false;
      console.log('⚠️ WhatsApp disconnected:', reason);
    });

    await client.initialize();
    return client;
  } catch (error) {
    console.error('❌ Failed to initialize WhatsApp client:', error);
    throw error;
  }
};

const getClient = () => client;
const getStatus = () => ({ ready: isReady });

module.exports = { initialize, getClient, getStatus };
