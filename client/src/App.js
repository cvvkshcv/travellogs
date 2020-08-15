import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import './App.css';
import LogForm from './resusable/LogForm';
import apis from './service/api';
import Rating from './resusable/Rating';

const App = () => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 15.335,
    longitude: 76.46,
    zoom: 7
  });
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [createEntry, setCreateEntry] = useState(null);

  const getLogs = async() => {
    const logEntries = await apis.listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getLogs();
  }, []);

  const showMarkerPopup = (pos) => {
    setShowPopup({});
    const [longitude, latitude] = pos.lngLat;
    setCreateEntry({ longitude, latitude });
  };

  const onCreate = () => {
    setCreateEntry(null);
    getLogs();
  };

  return (
    <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/cvvkshcv/ckdvb4do61z4i19pgebuoybtv"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => setViewport(viewport)}
        onDblClick={showMarkerPopup}
        doubleClickZoom={false}
        >
          {
            logEntries.map(entry => {
                return (
                  <div key={entry._id}>
                    <Marker latitude={entry.latitude} longitude={entry.longitude}>
                      <div onClick={() => {
                          setCreateEntry(null);
                          setShowPopup({[entry._id] : true });
                        }}>
                        <img style={{ height : `${6 * viewport.zoom}px`, width : `${6 * viewport.zoom}px` }} src="https://i.imgur.com/y0G5YTX.png" className="pin-icon" />
                      </div>
                    </Marker>
                      {
                        showPopup[entry._id] ? 
                          <Popup
                            anchor="top"
                            closeButton={true}
                            closeOnClick={false}
                            dynamicPosition={true}
                            latitude={entry.latitude}
                            longitude={entry.longitude}
                            onClose={() => setShowPopup({})}
                            className="my-map-popup"
                          >
                            <div className="">
                              <h2>{entry.title}</h2>
                              <p>Description : {entry.description}</p>
                              <small>Visited on : {new Date(entry.visitedDate).toLocaleDateString()}</small>
                              <Rating rating={entry.rating} stars={10} />
                            </div>
                          </Popup>
                        : null
                      }
                  </div>
                );
            })
          }
          {
            createEntry ? 
              <Popup
                anchor="top"
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                latitude={createEntry.latitude}
                longitude={createEntry.longitude}
                className="popup"
              >
                <LogForm lat={createEntry.latitude} lng={createEntry.longitude} onCreate={onCreate} />
              </Popup> : null
          }
    </ReactMapGL>
  );
}

export default App;
