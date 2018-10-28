const Diary = require('../../models/diaries-db');
const assert = require('chai').assert;

describe('Diaries Model Schema Tests', () => {

    const diaryTitle = 'Diary Testing';
    const diaryText = 'Hello, this is a diary for testing.';
    const likes = 5;
    const newComment = 'This is a comment for testing.';

    describe('Default created diary', () => {

        // Creating a new diary with default variables.
        let newDiary = new Diary();

        // Performing the tests;
        it('Diary title should be string', () => {
            assert.isString(newDiary.title, 'Diary title is string.')
        });

        it(`Diary title should be 'Untitled' by default.`, () => {
            assert.strictEqual(newDiary.title, 'Untitled', `Diary title is 'Untitled' by default.`);
        });

        it('Diary text should be string', () => {
            assert.isString(newDiary.text, 'Diary text is string.')
        });

        it('Diary text should be empty', () => {
            assert.isEmpty(newDiary.text);
        });

        it('Diary likes should be a number', () => {
            assert.isNumber(newDiary.likes, 'Diary likes counter is a number.');
        });

        it('Diary likes should be 1 by default', () => {
            assert.strictEqual(newDiary.likes, 1, 'Diary has default number of likes (1).');
        });

        it('Diary comments should be an array', () => {
            assert.isArray(newDiary.comments, 'Diary comments is stored in an array.');
        });

        it('Diary comments should be empty by default.', () => {
            assert.isEmpty(newDiary.comments);
        });

        it('Diary author should be a string', () => {
            assert.isString(newDiary.author, 'Diary author is a string.');
        });

        it('Diary author should be Anonymous by default.', () => {
            assert.strictEqual(newDiary.author, 'Anonymous', 'Diary author is Anonymous by default.')
        })

        it('Diary publicity should be a boolean', () => {
            assert.isBoolean(newDiary.sharing, 'Diary publicity is a boolean variable.');
        });

        it('Diary publicity should be true by default.', () => {
            assert.isTrue(newDiary.sharing, 'Diary publicity is true by default.');
        });
    });

    describe('Created diary with updated title and text', () => {

        // Creating a diary with updated variables.
        let newDiary = new Diary();
        newDiary.title = diaryTitle;
        newDiary.text = diaryText;
        newDiary.likes = likes;
        newDiary.comments.push(newComment);
        newDiary.sharing = false;

        it('Diary title should be string', () => {
            assert.isString(newDiary.title, 'Diary title is string.')
        });

        it(`Diary title should be updated to '${diaryTitle}'`, () => {
            assert.strictEqual(newDiary.title, diaryTitle, 'Diary title updated successfully.');
        });

        it('Diary text should be string', () => {
            assert.isString(newDiary.text, 'Diary text is string.')
        });

        it(`Diary text should be updated to '${diaryText}'`, () => {
            assert.strictEqual(newDiary.text, diaryText, 'Diary text updated successfully.');
        });

        it('Diary likes should be a number', () => {
            assert.isNumber(newDiary.likes, 'Diary likes counter is a number.');
        });

        it(`Diary likes should be updated to ${likes}`, () => {
            assert.strictEqual(newDiary.likes, likes, 'Diary likes counter updated successfully.');
        });

        it('Diary comments should be an array', () => {
            assert.isArray(newDiary.comments, 'Diary comments is stored in an array.');
        });

        it('Diary comments should not be empty.', () => {
            assert.isNotEmpty(newDiary.comments);
        });

        it('Diary author should be a string', () => {
            assert.isString(newDiary.author, 'Diary author is a string.');
        });

        it('Diary publicity should be a boolean', () => {
            assert.isBoolean(newDiary.sharing, 'Diary publicity is a boolean variable.');
        });

        it('Diary publicity should be false.', () => {
            assert.isFalse(newDiary.sharing, 'Diary publicity updated successfully.');
        });
    });
})