-- CreateTable
CREATE TABLE "Users" (
    "Id" SERIAL NOT NULL,
    "Name" VARCHAR(120) NOT NULL,
    "Email" VARCHAR(120) NOT NULL,
    "Password" VARCHAR(120) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Products" (
    "Id" SERIAL NOT NULL,
    "ProductName" VARCHAR(120) NOT NULL,
    "ProductCategory" VARCHAR(120) NOT NULL,
    "ProductPrice" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("Id")
);
