
/**
 * @swagger
 * definitions:
 *   Registration:
 *     properties:
 *       first_name:
 *         type: string
 *       last_name:
 *         type: string
 *       password:
 *         type: string
 *       national_id_type:
 *         type: string
 *       national_id:
 *         type: string
 *       alias:
 *         type: string
 *       profile:
 *         type: number
 *       email:
 *         type: string
 */


 /**
 * @swagger
 * definitions:
 *   UpdateUser:
 *     properties:
 *       first_name:
 *         type: string
 *       last_name:
 *         type: string
 *       id:
 *         type: string
 *       national_id_type:
 *         type: string
 *       national_id:
 *         type: string
 */

 /**
 * @swagger
 * definitions:
 *   Login:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */


 /**
 * @swagger
 * definitions:
 *   PostingAdd:
 *     properties:
 *       price_day:
 *         type: number
 *       start_date:
 *         type: string
 *       end_date:
 *         type: string
 *       state:
 *         type: string
 *       features:
 *         type: string
 *       public:
 *         type: boolean
 *       content:
 *         type: string 
 */

 /**
 * @swagger
 * definitions:
 *   PostingPut:
 *     properties:
 *       id_posting:
 *         type: integer
 *       price_day:
 *         type: number
 *       start_date:
 *         type: string
 *       end_date:
 *         type: string
 *       state:
 *         type: string
 *       features:
 *         type: string
 *       public:
 *         type: boolean
 *       content:
 *         type: string
 *       id_user:
 *         type: integer
 */

 
 /**
 * @swagger
 * definitions:
 *   RegistrationAdmin:
 *     properties:
 *       email:
 *         type: string
 *       first_name:
 *         type: string
 *       last_name:
 *         type: string
 *       age:
 *         type: string
 *       password:
 *         type: string
 *       national_id_type:
 *         type: string
 *       national_id:
 *         type: string
 *       alias:
 *         type: string
 */

 /**
 * @swagger
 * definitions:
 *   LoginGoogle:
 *     properties:
 *       token:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   AddProfile:
 *     properties:
 *       description:
 *         type: string
 */

 /**
 * @swagger
 * definitions:
 *   ChangePassword:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       validate:
 *         type: string
 */