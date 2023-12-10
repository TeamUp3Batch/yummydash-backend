/**
 * @swagger
 * definitions:
 *  Admin:
 *    type: object
 *    properties:
 *      email:
 *        type: string
 *        required: true
 *        uniqueItems: true
 *      otp:
 *        type: string
 *      otpCreatedAt:
 *        type: string
 *        format: date-time
 *      otpExpiry:
 *        type: string
 *        format: date-time
 */
/**
 * @swagger
 * definitions:
 *  Cart:
 *    type: object
 *    properties:
 *      userId:
 *        type: string
 *      restaurantId:
 *        type: string
 *      driverId:
 *        type: string
 *      userName:
 *        type: string
 *      userContact:
 *        type: string
 *      userAddress:
 *        type: string
 *      restaurantAddress:
 *        type: string
 *      restaurantName:
 *        type: string
 *      menuItems:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            itemId:
 *              type: string
 *            name:
 *              type: string
 *            perPrice:
 *              type: number
 *            price:
 *              type: number
 *            quantity:
 *              type: number
 *      total:
 *        type: number
 *      cartCreationTime:
 *        type: string
 *        format: date-time
 *      checkoutTime:
 *        type: string
 *        format: date-time
 *      country:
 *        type: string
 *      currency:
 *        type: string
 *      paymentType:
 *        type: string
 *      orderStatus:
 *        type: string
 *        enum:
 *          - initial
 *          - payment
 *          - acceptance
 *          - preparation
 *          - ready
 *          - pickup
 *          - delivery
 *      orderTracker:
 *        type: object
 *        properties:
 *          initial:
 *            type: object
 *            properties:
 *              timestamp:
 *                type: number
 *              status:
 *                type: boolean
 *          payment:
 *            type: object
 *            properties:
 *              timestamp:
 *                type: number
 *              status:
 *                type: boolean
 *          acceptance:
 *            type: object
 *            properties:
 *              timestamp:
 *                type: number
 *              status:
 *                type: boolean
 *          preparation:
 *            type: object
 *            properties:
 *              timestamp:
 *                type: number
 *              status:
 *                type: boolean
 *          ready:
 *            type: object
 *            properties:
 *              timestamp:
 *                type: number
 *              status:
 *                type: boolean
 *          pickup:
 *            type: object
 *            properties:
 *              timestamp:
 *                type: number
 *              status:
 *                type: boolean
 *          delivery:
 *            type: object
 *            properties:
 *              timestamp:
 *                type: number
 *              status:
 *                type: boolean
 *      driverRating:
 *        type: number
 *      restaurantRating:
 *        type: number
 *
 *  Comment:
 *    type: object
 *    properties:
 *      comment:
 *        type: string
 *        maxLength: 250
 */
/**
 * @swagger
 * definitions:
 *  Driver:
 *    type: object
 *    properties:
 *      firstName:
 *        type: string
 *        required: true
 *      lastName:
 *        type: string
 *        required: true
 *      email:
 *        type: string
 *        required: true
 *      password:
 *        type: string
 *        required: true
 *      phoneNumber:
 *        type: string
 *      ordersDelivered:
 *        type: number
 *        default: 0
 *      userRating:
 *        type: number
 */
/**
 * @swagger
 * definitions:
 *  Partner:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        required: true
 *      email:
 *        type: string
 *        required: true
 *      password:
 *        type: string
 *        required: true
 *      phoneNumber:
 *        type: string
 *      restaurantId:
 *        type: string
 *        format: ObjectId
 * */
/**
 * @swagger
 * definitions:
 *  Partner:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        required: true
 *      email:
 *        type: string
 *        required: true
 *      password:
 *        type: string
 *        required: true
 *      phoneNumber:
 *        type: string
 *      restaurantId:
 *        type: string
 *        format: ObjectId
 * */
/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      firstName:
 *        type: string
 *        required: true
 *      lastName:
 *        type: string
 *        required: true
 *      email:
 *        type: string
 *        required: true
 *      password:
 *        type: string
 *        required: true
 *      phoneNumber:
 *        type: string
 *      address:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            userAddress1:
 *              type: string
 *            latitude:
 *              type: string
 *            longitude:
 *              type: string
 *            isPrimaryAddress:
 *              type: boolean
 */
/**
 * @swagger
 * definitions:
 *  Error:
 *    type: object
 *    properties:
 *      statusCode:
 *        type: integer
 *        format: int32
 *        description: HTTP status code for the error
 *      message:
 *        type: string
 *        description: Error message describing the issue
 *      code:
 *        type: string
 *        description: Specific error code if available
 */
/**
 * @swagger
 * definitions:
 *  Cuisine:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        description: The name of the cuisine.
 *      imageUrl:
 *        type: string
 *        description: URL for the cuisine image.
 */
/**
 * @swagger
 * definitions:
 *   Restaurant:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: Name of the restaurant
 *       restaurantImage:
 *         type: string
 *         description: URL for the restaurant's image
 *       description:
 *         type: string
 *         description: Description of the restaurant
 *       cuisine:
 *         type: string
 *         description: Type of cuisine offered by the restaurant
 *       address:
 *         type: object
 *         properties:
 *           latitude:
 *             type: number
 *             format: double
 *             description: Latitude coordinate of the address
 *           longitude:
 *             type: number
 *             format: double
 *             description: Longitude coordinate of the address
 *           address1:
 *             type: string
 *             description: First line of the address
 *           street:
 *             type: string
 *             description: Street name
 *           city:
 *             type: string
 *             description: City name
 *           province:
 *             type: string
 *             description: Province or state name
 *           postalCode:
 *             type: string
 *             description: Postal code
 *           country:
 *             type: string
 *             description: Country name
 *       contact:
 *         type: object
 *         properties:
 *           phone:
 *             type: string
 *             description: Contact phone number
 *           email:
 *             type: string
 *             format: email
 *             description: Contact email address
 *           website:
 *             type: string
 *             format: uri
 *             description: Restaurant's website URL
 *       menu:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Name of the menu item
 *             description:
 *               type: string
 *               description: Description of the menu item
 *             price:
 *               type: number
 *               format: double
 *               description: Price of the menu item
 *             category:
 *               type: string
 *               description: Category of the menu item
 *             image:
 *               type: string
 *               description: URL for the menu item's image
 *       ratings:
 *         type: number
 *         format: double
 *         description: Overall ratings of the restaurant
 *       reviews:
 *         type: array
 *         description: Array of reviews (not defined in the schema)
 *       openingHours:
 *         type: object
 *         description: Restaurant's opening hours (not defined in detail in the schema)
 *       estimatedDeliveryTime:
 *         type: object
 *         properties:
 *           minEstimatedTime:
 *             type: number
 *             description: Minimum estimated delivery time in minutes
 *           medEstimatedTime:
 *             type: number
 *             description: Medium estimated delivery time in minutes
 *           maxEstimatedTime:
 *             type: number
 *             description: Maximum estimated delivery time in minutes
 */





