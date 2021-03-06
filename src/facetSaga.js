import hasFacet from './helpers/hasFacet';
import getFacet from './helpers/getFacet';
import withFacet from './helpers/withFacet';

export default function facetSaga(saga) {
  return function*(action) {
    if (!hasFacet()(action)) {
      yield* saga(action);
      return;
    }

    const facetName = getFacet(action);

    const iterator = saga(action);
    let lastResult;

    while (true) {
      const next =
        lastResult instanceof Error
          ? iterator.throw(lastResult)
          : iterator.next(lastResult);

      if (next.done) {
        return;
      }

      try {
        if (next.value.PUT) {
          lastResult = yield {
            ...next.value,
            PUT: {
              ...next.value.PUT,
              action: withFacet(facetName)(next.value.PUT.action),
            },
          };
        } else {
          lastResult = yield next.value;
        }
      } catch (err) {
        lastResult = err;
      }
    }
  };
}
