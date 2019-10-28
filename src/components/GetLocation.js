import React from 'react';
import { Location } from '@reach/router';

function GetLocation(Component) {
  class HOC extends React.Component {
    render() {
      return (
        <Location>
          {({ location }) => {
            return (
              <Component 
                currentPath={location.pathname.split('/')[1]}
                location={location}
                {...this.props} 
              />
            )
          }}
        </Location>
      )
    }
  }
  
  return HOC;
}

export default GetLocation;
