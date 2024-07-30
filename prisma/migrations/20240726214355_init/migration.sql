-- CreateTable
CREATE TABLE "Product" (
    "product_id" SERIAL NOT NULL,
    "prio" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_description1" TEXT NOT NULL,
    "product_description2" TEXT NOT NULL,
    "product_description3" TEXT NOT NULL,
    "product_description4" TEXT NOT NULL,
    "product_material" TEXT NOT NULL,
    "product_imagepath_small" TEXT NOT NULL,
    "product_imagepath_big1" TEXT NOT NULL,
    "product_imagepath_big2" TEXT NOT NULL,
    "product_imagepath_big3" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Article" (
    "article_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "article_number" TEXT NOT NULL,
    "article_prio" INTEGER NOT NULL,
    "article_name" TEXT NOT NULL,
    "article_description" TEXT NOT NULL,
    "article_description1" TEXT NOT NULL,
    "article_description2" TEXT NOT NULL,
    "article_description3" TEXT NOT NULL,
    "vpe1" TEXT NOT NULL,
    "vpe2" TEXT NOT NULL,
    "vpe3" TEXT NOT NULL,
    "vpe4" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("article_id")
);

-- CreateTable
CREATE TABLE "Color" (
    "color_id" TEXT NOT NULL,
    "color_name" TEXT NOT NULL,
    "color_code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Product_Color_Connection" (
    "color_id" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "color_suffix" INTEGER NOT NULL,

    CONSTRAINT "Product_Color_Connection_pkey" PRIMARY KEY ("product_id","color_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Color_color_id_key" ON "Color"("color_id");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Color_Connection" ADD CONSTRAINT "Product_Color_Connection_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Color_Connection" ADD CONSTRAINT "Product_Color_Connection_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "Color"("color_id") ON DELETE RESTRICT ON UPDATE CASCADE;
