# Project structure as hexagonal architectures

```bash
myproject/
|-- app/
|-- |-- player/
|       |-- interface.ts
|       |-- handler.ts
|       |-- repository.ts
|       |-- service.ts
|-- config/
|   |-- db.config.ts
|   |-- cors.config.ts
|-- models/
|-- |-- player.ts
|-- |-- wallet.ts
|-- routes/
|   |-- appRouter.ts
|-- util/
|   |-- emum/ ...
|   |-- errs/ ...
|   |-- hanleResponse/ ..
|-- app.ts
|-- .env

```

1. node & env version

```bash
node: v20.10.0
tsc: 5.0.4
npm: 10.2.3
yarn: 1.22.19

```

2. Before run the project, you should run the command as following:

```bash
yarn
#or
npm i
```

3. Dependencies

```bash
yarn
#
yarn add nodemon ts-node --dev
yarn add typescript express @types/express ip @types/ip cors @types/cors dotenv @types/dotenv
yarn add mysql2 sequelize-typescript bcrypt @types/bcrypt
yarn add moment winston
yarn add jsonwebtoken
```

4. Run app with development & production

```bash
yarn dev
yarn prod
# or
npm run dev
npm run prod
```

5. Due to, time is limited. Thus, I could not implement as success as you mentioned

```bash
Thank you !!!

Best regards,
```
