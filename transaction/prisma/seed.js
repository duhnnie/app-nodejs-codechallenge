"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const transactionTypes = ['type A', 'type B', 'type C'];
        transactionTypes.forEach((transactionType, index) => __awaiter(this, void 0, void 0, function* () {
            yield prisma.transactionType.upsert({
                where: { id: index + 1 },
                update: {},
                create: {
                    name: transactionType
                }
            });
        }));
        console.log(`database was seeded with transaction types: ${transactionTypes}`);
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(`Error at seeding database: ${error}`, error);
    yield prisma.$connect();
    process.exit(0);
}));
