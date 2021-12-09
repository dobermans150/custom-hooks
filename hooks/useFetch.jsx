import { useEffect, useRef } from 'react';
import { useState } from 'react/cjs/react.development';

export const useFetch = ( url ) => {
  const isMounted = useRef( true );
  const [ state, setState ] = useState( {
    data: null,
    loading: true,
    error: null,
  } );

  useEffect( () => {
    return () => {
      isMounted.current = false;
    };
  }, [] );

  useEffect( () => {
    setState( { data: null, loading: true, error: null } );

    fetch( url )
      .then( ( response ) => response.json() )
      .then( ( data ) => {
        if ( isMounted.current ) {
          setState( { loading: false, data, error: null } );
        }
      } ).catch( () => setState( { loading: false, data: null, error: 'no se puedo cargar la info' } ) )
  }, [ url ] );

  return state;
};
