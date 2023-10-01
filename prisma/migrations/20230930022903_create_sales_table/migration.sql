-- CreateTable
CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);
