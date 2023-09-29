import React from 'react';
import { Spin } from 'antd';


function Loader ({small,fullWidth}) {
    return (
      <div style={{
        padding: small??150, background: '', minHeight: small??360, margin: '0 auto', textAlign: 'center',
        width:fullWidth?'100%':'auto',
          borderRadius: 22
      }}
      >
        <Spin size="large"  />
      </div>

    )

}

export default Loader;
