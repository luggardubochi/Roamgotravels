import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Roamgo Travels API',
      version: '1.0.0',
      description: 'API documentation for Roamgo Travels - A travel booking platform',
      contact: {
        name: 'Roamgo Travels',
        email: 'support@roamgotravels.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server',
      },
      {
        url: 'https://your-backend-url.com/api',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            user_id: { type: 'string', format: 'uuid' },
            email: { type: 'string', format: 'email' },
            username: { type: 'string' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            phone_number: { type: 'string' },
            role: { type: 'string', enum: ['user', 'admin'] },
            is_active: { type: 'boolean' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        Booking: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            image: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            bookingType: { type: 'string', enum: ['single', 'family', 'couple', 'group'] },
            bulletPoints: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', format: 'uuid' },
                  name: { type: 'string' },
                },
              },
            },
          },
        },
        UserBooking: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            user: { $ref: '#/components/schemas/User' },
            trip: { $ref: '#/components/schemas/Booking' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            travelers: { type: 'integer', minimum: 1 },
            notes: { type: 'string' },
            status: { type: 'string', enum: ['pending', 'confirmed', 'cancelled'] },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
          },
        },
        SignupRequest: {
          type: 'object',
          required: ['email', 'username', 'password', 'first_name', 'last_name', 'phone_number'],
          properties: {
            email: { type: 'string', format: 'email' },
            username: { type: 'string', minLength: 3 },
            password: { type: 'string', minLength: 6 },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            phone_number: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/docs/*.ts'], // Path to the API docs
};

export const specs = swaggerJsdoc(options); 