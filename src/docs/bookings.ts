/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all trips
 *     description: Retrieve all available trips
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: List of trips
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new trip
 *     description: Add a new trip (admin only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, image, description, price, startDate, endDate, bookingType]
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               bookingType:
 *                 type: string
 *                 enum: [single, family, couple, group]
 *               bulletPoints:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *     responses:
 *       201:
 *         description: Trip created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 booking:
 *                   $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */

/**
 * @swagger
 * /bookings/{id}:
 *   patch:
 *     summary: Update a trip
 *     description: Update trip details (admin only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Trip ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               bookingType:
 *                 type: string
 *                 enum: [single, family, couple, group]
 *               bulletPoints:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *     responses:
 *       200:
 *         description: Trip updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 booking:
 *                   $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Trip not found
 */

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete a trip
 *     description: Remove a trip (admin only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Trip ID
 *     responses:
 *       200:
 *         description: Trip deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Trip not found
 */

/**
 * @swagger
 * /bookings/bullet/edit:
 *   patch:
 *     summary: Edit a booking bullet point
 *     description: Update the name of a bullet point for a booking (admin only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [bulletId, name]
 *             properties:
 *               bulletId:
 *                 type: string
 *                 format: uuid
 *                 description: Bullet point ID
 *               name:
 *                 type: string
 *                 description: New bullet point name
 *     responses:
 *       200:
 *         description: Bullet point updated successfully
 *       400:
 *         description: bulletId and name are required
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Bullet not found
 */

/**
 * @swagger
 * /bookings/bullet/remove:
 *   delete:
 *     summary: Remove a booking bullet point
 *     description: Delete a bullet point from a booking (admin only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [bulletId]
 *             properties:
 *               bulletId:
 *                 type: string
 *                 format: uuid
 *                 description: Bullet point ID
 *     responses:
 *       200:
 *         description: Bullet point deleted successfully
 *       400:
 *         description: bulletId is required
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Bullet not found
 */

/**
 * @swagger
 * /bookings/bullet/add:
 *   post:
 *     summary: Add bullet points to a booking
 *     description: Add one or more bullet points to a booking (admin only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [bullets]
 *             properties:
 *               bullets:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                 description: Array of bullet points to add
 *     responses:
 *       200:
 *         description: Bullet points added successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */

/**
 * @swagger
 * /bookings/bullet/{id}:
 *   get:
 *     summary: Get a single bullet point
 *     description: Get details of a single bullet point by its ID (admin only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Bullet point ID
 *     responses:
 *       200:
 *         description: Bullet point details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bullet:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     name:
 *                       type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Bullet not found
 */ 