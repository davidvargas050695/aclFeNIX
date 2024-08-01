const products = [
    {
      "id": 1,
      "name": " CALENTADOR DE MUJER EN ALGODÓN",
      "description": "CALENTADOR DE MUJER EN ALGODÓN EN TODAS LAS TALLAS, POR TU COMPRA AL POR MAYOR OBTENDRAS UN DESCUENTO ESPECIAL",
      "price": 27.8,
      "categoryId": 1,
      "quantity": 1,
      "urlImage": "https://maki-static.s3.amazonaws.com/CTRF_image/CTRF_1713816823001/ALGODON-MUJER-186.png"
    },
    {
      "id": 2,
      "name": " CROPPED PRINT DE DRAGON BALL Z",
      "description": " CAMISETAS CROPPED PRINT DE DRAGON BALL Z DISPONIBLE EN TODAS LAS TALLAS , POR TU COMPRA AL POR MAYOR OBTENDRAS UN DESCUENTO ESPECIAL.",
      "price": 10.8,
      "quantity": 1,
      "urlImage": "https://maki-static1.s3.amazonaws.com/CTRF_image/CTRF_1713816823001/191.png",
      "categoryId": 1
    },
    {
      "id": 3,
      "name": "BUZO L.D.U TALLAS 34-32",
      "codeRetention": null,
      "quantity": 1,
      "description": "BUZO DE LA L.D.U CON LOGOTIPOS BORDADOS #34-32, POR TU COMPRA AL POR MAYOR OBTENDRAS UN DESCUENTO ESPECIAL",
      "price": 18,
      "categoryId": 1,
      "urlImage": "https://maki-static.s3.amazonaws.com/CTRF_image/CTRF_1713816823001/BUZO287.png"
    },
    {
      "id": 4,
      "name": "BUZO L.D.U TALLAS 40-38-36",
      "description": "BUZO DE LA L.D.U CON LOGOTIPOS BORDADOS #40-38-36, POR TU COMPRA AL POR MAYOR OBTENDRAS UN DESCUENTO ESPECIAL",
      "price": 20,
      "quantity": 1,
      "categoryId": 1,
      "urlImage": "https://maki-static.s3.amazonaws.com/CTRF_image/CTRF_1713816823001/BUZO380.png"
    },
    {
      "id": 5,
      "name": " CALENTADOR DE MUJER EN ALGODÓN",
      "description": "CALENTADOR DE MUJER EN ALGODÓN EN TODAS LAS TALLAS, POR TU COMPRA AL POR MAYOR OBTENDRAS UN DESCUENTO ESPECIAL",
      "price": 27.8,
      "categoryId": 1,
      "quantity": 1,
      "urlImage": "https://maki-static.s3.amazonaws.com/CTRF_image/CTRF_1713816823001/ALGODON-MUJER-186.png"
    },
    {
      "id": 6,
      "name": "PLAY STATION 4",
      "description": " COLOR NEGRO CAPACIDAD 250GB",
      "price": 10.8,
      "quantity": 1,
      "urlImage": "https://praktiko1.s3.amazonaws.com/imagenes/1366_2000.jpg",
      "categoryId": 2
    },
    {
      "id": 7,
      "name": "XBOX CON PLAY 5",
      "codeRetention": null,
      "quantity": 1,
      "description": "LLEVATE LA PROMOCION DE 2 CONSOLAS AL 20%",
      "price": 18,
      "categoryId": 2,
      "urlImage": "https://praktiko1.s3.amazonaws.com/imagenes/Comparacio%CC%81n-de-consolas.jpg"
    },
    {
      "id": 8,
      "name": "NINTENDO SWITCH",
      "description": "JUEGA EN TU TIEMPO LIBRE CON ESTE NINTENDO ",
      "price": 20,
      "quantity": 1,
      "categoryId": 2,
      "urlImage": "https://praktiko1.s3.amazonaws.com/imagenes/descargar+(5).jpg"
    },
    {
      "id": 9,
      "name": "PLAY STATION 2",
      "description": "LLEVATE ESTA CONSOLA CLASICA, LA CONSOLA MAS VENDIDA DEL SIGLO 20",
      "price": 27.8,
      "categoryId": 2,
      "quantity": 1,
      "urlImage": "https://praktiko1.s3.amazonaws.com/imagenes/images.jpg"
    },
    {
      "id": 10,
      "name": "PLAY 5",
      "description": "LLEVATE EL PLAY 5 , CON 1 TB DE CAPACIDAD 2 PALANCAS",
      "price": 10.8,
      "quantity": 1,
      "urlImage": "https://praktiko1.s3.amazonaws.com/imagenes/sube-el-precio-de-las-consolas.jpg",
      "categoryId": 2
    },
    {
      "id": 11,
      "name": "ZAPATILLAS NITKE",
      "codeRetention": null,
      "quantity": 1,
      "description": "ORIGINAL COLOR NEGRO MARCA NIKE",
      "price": 80,
      "categoryId": 3,
      "urlImage": "https://praktiko1.s3.amazonaws.com/imagenes/descargar+(6).jpg"
    },
    {
      "id": 12,
      "name": "NIKE ZAPATILLAS EDICION LIMITADA",
      "description": "EDICION LIMITADA ESPECIAL COLOR NARANJA",
      "price": 85,
      "quantity": 1,
      "categoryId": 3,
      "urlImage": "https://praktiko1.s3.amazonaws.com/imagenes/descargar+(7).jpg"
    },
    {
      "id": 13,
      "name": "ZAPATILLAS NIKE BLANCO CON NEGRO",
      "description": "ZAPATILLAS CLASICAS  A PROMOCION",
      "price": 105.8,
      "categoryId": 3,
      "quantity": 1,
      "urlImage": "https://praktiko1.s3.amazonaws.com/imagenes/e26ff9d35fd57a1bbf9ac3eb58ac956e.jpg"
    },
    {
      "id": 14,
      "name": "ZAPATILLAS NIKE CLASICAS",
      "description": "ZAPATILLAS CLASICAS COLOR NEGRA A 50 %.",
      "price": 90.8,
      "quantity": 1,
      "urlImage": "https://praktiko1.s3.amazonaws.com/imagenes/images+(1).jpg",
      "categoryId": 3
    },
    {
      "id": 15,
      "name": "ZAPATILLAS NIKE  EDICION LIMITADA",
      "codeRetention": null,
      "quantity": 1,
      "description": "EDICION LIMITADA COLOR AZUL ULTIMAS DISPONIBLES",
      "price": 18,
      "categoryId": 3,
      "urlImage": "https://praktiko1.s3.amazonaws.com/imagenes/tenis-air-max-dn-27XkSQ.png"
    },
    {
      "id": 16,
      "name": "BICILETA CLASICA",
      "description": "BICICLETA CLASICA PARA CIUDAD  COLOR AMARILLA",
      "price": 100,
      "quantity": 1,
      "categoryId": 4,
      "urlImage": "https://praktiko1.s3.amazonaws.com/imagenes/descargar+(3).jpg"
    },
    {
      "id": 17,
      "name": "BICICLETA MONTAÑERA CALIDAD BASICA",
      "description": "BICICLETA MONTAÑERA CALIDAD BAJA ",
      "price": 200,
      "quantity": 1,
      "categoryId": 4,
      "urlImage": "https://praktiko1.s3.amazonaws.com/imagenes/descargar+(4).jpg"
    },
    {
      "id": 18,
      "name": "BICILETA MONTAÑERA CALIDAD MEDIANA",
      "description": "BICICLETA MONTAÑERA CALIDAD MEDIANA",
      "price": 300,
      "quantity": 1,
      "categoryId": 4,
      "urlImage": "https://praktiko1.s3.amazonaws.com/imagenes/descargar+(2).jpg"
    },
    {
      "id": 19,
      "name": "BICILETA MONTAÑERA CALIDAD PREMION",
      "description": "BICICLETA MONTAÑERA CALIDAD PREMIUM, DE ACERO INOXIDABLE",
      "price": 400,
      "quantity": 1,
      "categoryId": 4,
      "urlImage": "https://praktiko1.s3.amazonaws.com/imagenes/descargar+(1).jpg"
    },
    {
      "id": 20,
      "name": "BICICLETA  NEGRA",
      "description": "BICICLETA AL 50 %",
      "price": 100,
      "quantity": 1,
      "categoryId": 4,
      "urlImage": "https://praktiko1.s3.amazonaws.com/imagenes/bicicleta-montanera-aro-29-hawk-3-0_1024x.webp"
    }
  ];

export default products;