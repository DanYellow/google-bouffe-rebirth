import { Locations as LocationsMocks } from '__mocks__';

export default {
    get: () => Promise.resolve(LocationsMocks),
};
