/**
 * @swagger
 * /user-bookings:
 *   post:
 *     summary: Book a trip
 *     description: Create a new user booking
 *     tags: [User Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [trip, startDate, endDate, travelers]
 *             properties:
 *               trip:
 *                 type: string
 *                 format: uuid
 *                 description: Trip ID
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               travelers:
 *                 type: integer
 *                 minimum: 1
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userBooking:
 *                   $ref: '#/components/schemas/UserBooking'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trip not found
 */

/**
 * @swagger
 * /user-bookings:
 *   get:
 *     summary: Get user bookings
 *     description: Get all bookings for the current user (or all bookings for admin)
 *     tags: [User Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookings:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserBooking'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /user-bookings/{id}:
 *   get:
 *     summary: Get a specific user booking
 *     description: Get details of a specific user booking (owner or admin only)
 *     tags: [User Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User booking ID
 *     responses:
 *       200:
 *         description: User booking details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 booking:
 *                   $ref: '#/components/schemas/UserBooking'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the booking owner
 *       404:
 *         description: Booking not found
 */

/**
 * @swagger
 * /user-bookings/{id}:
 *   put:
 *     summary: Update a user booking
 *     description: Update user booking details (owner or admin only)
 *     tags: [User Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               travelers:
 *                 type: integer
 *                 minimum: 1
 *               notes:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, cancelled]
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 booking:
 *                   $ref: '#/components/schemas/UserBooking'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the booking owner
 *       404:
 *         description: Booking not found
 */

/**
 * @swagger
 * /user-bookings/{id}/cancel:
 *   post:
 *     summary: Cancel a user booking
 *     description: Cancel a user booking (owner or admin only)
 *     tags: [User Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User booking ID
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 booking:
 *                   $ref: '#/components/schemas/UserBooking'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the booking owner
 *       404:
 *         description: Booking not found
 */ 