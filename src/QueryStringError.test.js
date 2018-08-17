import QueryStringError from './QueryStringError';

describe('QueryStringError', () => {
    it('throws the error with the properties attached', () => {
        const error = new QueryStringError(
            'test message',
            'test url'
        );

        expect(QueryStringError.prototype.toString.apply(error)).toEqual(
            'QueryStringError: test message <test url>'
        );
    });
});

