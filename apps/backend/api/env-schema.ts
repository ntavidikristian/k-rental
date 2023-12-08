const Joi =  require("joi");
export const envSchema = Joi.object({
    PRIVATE_KEY: Joi.string().required(),

    
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432).required(),
})
