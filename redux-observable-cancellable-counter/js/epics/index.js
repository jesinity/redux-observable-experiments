import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { START_COUNTDOWN, INCREMENT_ASYNC, INCREMENT, CANCEL_INCREMENT_ASYNC, COUNTDOWN_TERMINATED } from '../actionTypes';

const startCountdown = (action$) => {
  return action$
   /*
    * This action does not exist in the redux saga example: it's used to isolate
    * better a single countdown worflow.
    */
    .ofType(START_COUNTDOWN).switchMap(q => {
      const start = 5;

      /*
       * a countdown generates a 5,4,3,2,1,0,-1 series of events,
       * where all are separated by 1 second and the last one only
       * by 10 millisecond.
       * This way when the counter hit 0 the "INCREMENT_ASYNC" is published,
       * while when it hits -1 (10 milliseconds later) the increment is fired at last.
       */
      return Observable
        .timer(0,1000)
        .mergeMap(x=> {
          if(x === start ){
            return Observable.timer(0,10).mergeMap(y => Observable.of(start,start+1))
          }
          else{
            return Observable.of(x)
          }
        })
        .map(i => start - i)
        .take(start +2 )
        // supports cancellation
        .takeUntil(action$.ofType(CANCEL_INCREMENT_ASYNC))
        .map(seconds => {
          if (seconds === -1) {
            return {type: INCREMENT }
          }
          else {
            return {type: INCREMENT_ASYNC, value: seconds}
          }
        });
    });
};

/**
 * there is only one epic.
 */
export const rootEpic = combineEpics(
  startCountdown
);



