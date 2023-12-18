import { Injectable } from '@angular/core';

@Injectable( {
    providedIn: 'root'
} )
export class UtilsService {

    /**
     * Shuffles an array
     * @param mixArray Array to be shuffled
     * @param mixCount Number of times to shuffle the array
     * @returns 
     */
    shuffle_array( mixArray: Array<any>, mixCount: number ): Array<any> {
        for( let x = 0; x < mixCount; x++ ) {
            let first = Math.floor( Math.random() * mixArray.length );
            let second = Math.floor( Math.random() * mixArray.length );
            let temp = mixArray[ first ];
            mixArray[ first ] = mixArray[ second ];
            mixArray[ second ] = temp;
        }
        return mixArray;
    }
}
