ТЗ для full stack middle JS разработчика.
Необходимо применить:
- TypeScript +
- express +, jwt +
- react +, redux +, styled ?, material ui (опционально) +
- Принципы DDD ?, SOLID +, GRASP ?

Цель — создать веб приложение для заказа товаров со склада
Личный кабинет с разделением на роли: админ и пользователь

Реализовать авторизацию и регистрацию:
- Форма регистрации для пользователей
- Использовать JWT
- Админ создается в БД, форма регистрации для него не нужна // seeds

Раздел с товарами:
- CRUD товаров для админа // CRUD — акроним, обозначающий четыре базовые функции, используемые при работе с базами данных[1]: создание (англ. create), чтение (read), модификация (update), удаление (delete).
- Обычные пользователи могут только заказывать товары
- Данные о товарах, их кол-ве и стоимости должны хранится в БД ([MySQL]/PostgreSQL)

Будет плюсом:
- Использовать Sequelize+ для работы с БД
- Тесты (jest?)
- Упаковка в докер +
- Написание gitlab CI - тестирование, линтинг, билд, деплой (ssh...) ??