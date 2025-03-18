import React, { useState } from 'react';

const LayoutScheme = () => {
  const objects = [
    { id: 'chair', name: 'Стул', image: '/img/object/chair.png' },
    { id: 'table', name: 'Стол', image: '/img/object/table.png' },
    { id: 'table_plus_chair', name: 'Стол и стул', image: '/img/object/table_plus_chair.png' },
    { id: 'wall', name: 'Стена', image: '/img/object/wall.png' },
  ];

  const [placedObjects, setPlacedObjects] = useState([]);

  const handleSave = () => {
    const data = JSON.stringify(placedObjects);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'layout.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleLoad = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const loadedObjects = JSON.parse(event.target.result);
        setPlacedObjects(loadedObjects);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Планировщик зала</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={handleSave}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#40a9ff')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#1890ff')}
        >
          Сохранить расстановку
        </button>
        <label
          style={{
            padding: '8px 16px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#40a9ff')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#1890ff')}
        >
          Загрузить расстановку
          <input
            type="file"
            accept=".json"
            onChange={handleLoad}
            style={{ position: 'absolute', top: 0, left: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
          />
        </label>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div
          style={{
            width: '200px',
            backgroundColor: '#f4f4f4',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <h3>Объекты</h3>
          {objects.map(obj => (
            <div
              key={obj.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px',
                backgroundColor: 'white',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                cursor: 'grab',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
              onMouseOut={(e) => (e.target.style.backgroundColor = 'white')}
              draggable
              onDragStart={(e) => {
                console.log('Drag start:', obj);
                e.dataTransfer.setData('object', JSON.stringify(obj));
              }}
            >
              <img src={obj.image} alt={obj.name} style={{ width: '40px', height: '40px' }} />
              <p>{obj.name}</p>
            </div>
          ))}
        </div>
        <div
          style={{
            flex: 1,
            height: '500px',
            backgroundColor: '#e8ecef',
            border: '2px dashed #aaa',
            position: 'relative',
          }}
          onDrop={(e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData('object');
            console.log('Drop event data:', data);
            if (data) {
              try {
                const obj = JSON.parse(data);
                const x = Math.max(0, e.clientX - e.currentTarget.getBoundingClientRect().left);
                const y = Math.max(0, e.clientY - e.currentTarget.getBoundingClientRect().top);
                console.log('Dropped at:', x, y);
                setPlacedObjects([...placedObjects, { ...obj, x, y }]);
              } catch (error) {
                console.error('Error parsing object:', error);
              }
            } else {
              console.error('No data in dataTransfer');
            }
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          {placedObjects.map((placed, index) => (
            <div
              key={`${placed.id}-${index}`}
              style={{
                position: 'absolute',
                left: placed.x,
                top: placed.y,
                cursor: 'move',
              }}
              draggable
              onDragStart={(e) => {
                console.log('Drag start for placed object:', index);
                e.dataTransfer.setData('index', index);
              }}
              onDragEnd={(e) => {
                const newX = Math.max(0, e.clientX - e.currentTarget.parentElement.getBoundingClientRect().left);
                const newY = Math.max(0, e.clientY - e.currentTarget.parentElement.getBoundingClientRect().top);
                console.log('Drag end at:', newX, newY);
                const newObjects = [...placedObjects];
                newObjects[index] = { ...newObjects[index], x: newX, y: newY };
                setPlacedObjects(newObjects);
              }}
            >
              <img src={placed.image} alt={placed.name} style={{ width: '50px', height: '50px' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LayoutScheme;
