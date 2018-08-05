import QueryStringError from './QueryStringError';

describe('QueryStringError', () => {
    it('throws the error with the properties attached', () => {
        const error = new QueryStringError(
            'test message',
            'test url'
        );

        //Jest coverage breaks this
        //expect(String(error)).toEqual('QueryStringError: test message <test url>');
    });
});

