import { Images } from "@config";

const DataPayment = {
    "payment": {
      "title": "Bank Transfer",
      "payment_type": "bank_transfer",
      "subPayment": [
        {
          "title": "BCA",
          "name": "bca",
          "icon": "",
          "attribute": {
            "bank_transfer": {
              "bank": "bca"
            }
          }
        },
        {
          "title": "Permata",
          "name": "permata",
          "icon": "",
          "attribute": {
            "bank_transfer": {
              "bank": "permata"
            }
          }
        },
        {
          "title": "BNI",
          "name": "bni",
          "icon": "",
          "attribute": {
            "bank_transfer": {
              "bank": "bni"
            }
          }
        }
      ]
    },
    "subPayment": {
      "title": "BCA",
      "name": "bca",
      "icon": "",
      "attribute": {
        "bank_transfer": {
          "bank": "bca"
        }
      }
    },
  };

export { DataPayment };
