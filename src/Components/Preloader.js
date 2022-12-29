import React from 'react';
import { Spin } from 'antd';


function Preloader ({small,fullWidth}) {
    return (
      <div style={{
        padding: small??150, background: '#fff', minHeight: small??360, margin: '0 auto', textAlign: 'center',
        width:fullWidth?'100%':'auto'
      }}
      >
        <Spin size="large" tip={'Loading'} />
      </div>

    )

}

export default Preloader;
