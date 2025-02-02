var parsingPositive: object = require('../test/parsing_positive.json');
var validationPositive: object = require('../test/validation_positive.json');
var validationNegative: object = require('../test/validation_negative.json');
import { SiweMessage } from "./client";

describe(`Message Generation`, () => {
	test.concurrent.each(Object.entries(parsingPositive))('Generates message successfully: %s', (_, test) => {
		const msg = new SiweMessage(test.fields);
		expect(msg.toMessage()).toBe(test.message);
	});
});

describe(`Message Validation`, () => {
	test.concurrent.each(Object.entries(validationPositive))('Validates message successfully: %s', async (_, test_fields) => {
		const msg = new SiweMessage(test_fields);
		await expect(msg.validate()).resolves.not.toThrow();
	});
	test.concurrent.each(Object.entries(validationNegative))('Fails to validate message: %s', async (_, test_fields) => {
		const msg = new SiweMessage(test_fields);
		await expect(msg.validate()).rejects.toThrow();
	});
});
