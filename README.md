# TravelHub - نظام إدارة حجوزات النقل والأمانات

## نظرة عامة

TravelHub هو نظام كامل لإدارة الحجوزات، الركاب، الأمانات، والمشرفين مع تنبيهات واتساب مباشرة.

## المميزات

- إدارة العملاء
- إنشاء الأحجوزات
- إدارة الرحلات والأمانات
- حساب التسويات
- تنبيهات واتساب فورياً
- واجهة API جاهزة للتكامل

## التشغيل السريع

```bash
npm install
cp .env.example .env
npm run dev
```

## API الرئيسية

- `GET /api/health`
- `GET /api/customers`
- `POST /api/customers`
- `GET /api/bookings`
- `POST /api/bookings`
- `GET /api/settlements`
- `POST /api/settlements`

## مثال إنشاء عميل

```json
{
  "name": "محمد علي",
  "phone": "966500000000",
  "city": "الرياض",
  "notes": "عميل دائم"
}
```

## مثال إنشاء حجز

```json
{
  "customerId": "ID_HERE",
  "tripType": "ride",
  "routeFrom": "الرياض",
  "routeTo": "جدة",
  "date": "2026-10-01",
  "time": "18:00",
  "passengers": 2,
  "amount": 350,
  "notes": "رحلة عائلية"
}
```

## متطلبات النشر

- MongoDB
- Node.js 18+
- Railway / Render / VPS

## ملاحظة

هذا هو إنشاء أولي للتطبيق، ويمكن تطويره لاحقاً إلى لوحة إدارة كاملة + تطبيق موبايل + Web Dashboard.
