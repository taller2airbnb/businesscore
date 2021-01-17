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
 *         type: number
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
 *       google_token:
 *         type: string
 *       user_type:
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
 *       name:
 *         type: string 
 *       country:
 *         type: string
 *       city:
 *         type: string  
 *       max_number_guests:
 *         type: number
 *       latitude:
 *         type: number
 *       longitude:
 *         type: number     
 */

 /**
 * @swagger
 * definitions:
 *   PostingPut:
 *     properties:
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
 *       name:
 *         type: string
 *       country:
 *         type: string
 *       city:
 *         type: string  
 *       max_number_guests:
 *         type: number  
 *       latitude:
 *         type: number
 *       longitude:
 *         type: number  
 
 */

 
 /**
 * @swagger
 * definitions:
 *   Registration:
 *     properties:
 *       email:
 *         type: string
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
 *       google_token:
 *         type: string   
 *       user_type:
 *         type: string
 *       profile:
 *         type: number
 *       user_logged_id:
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
 *       new_password:
 *         type: string
 *       token:
 *         type: string
 */


 /**
 * @swagger
 * definitions:
 *   intentBooking:
 *     properties:
 *       idPosting:
 *         type: number
 *       initialDate:
 *         type: string
 *       lastDate:
 *         type: string
 */

 
 /**
 * @swagger
 * definitions:
 *   BlockedStatus:
 *     properties:
 *       new_status:
 *         type: boolean
 */


 /**
 * @swagger
 * definitions:
 *   AcceptBooking:
 *     properties:
 *       transactionHash:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   RejectBooking:
 *     properties:
 *       transactionHash:
 *         type: string
 */


/**
 * @swagger
 * definitions:
 *   PricePut:
 *     properties:
 *       priceRoom:
 *         type: number
 */

 /**
 * @swagger
 * definitions:
 *   RatingAdd:
 *     properties:
 *       score:
 *         type: number
 *       content:
 *         type: string
 */

  /**
 * @swagger
 * definitions:
 *   CommentAdd:
 *     properties:
 *       content:
 *         type: string
 *       linkedComment:
 *         type: number
 */

   /**
 * @swagger
 * definitions:
 *   CommentDel:
 *     properties:
 *       idComment:
 *         type: number
 */


 /**
 * @swagger
 * definitions:
 *   ChangePushToken:
 *     properties:
 *       push_token:
 *         type: string
 */

 /**
 * @swagger
 * definitions:
 *   PushNotification:
 *     properties:
 *       body:
 *         type: string
 *       title:
 *         type: string
 */



