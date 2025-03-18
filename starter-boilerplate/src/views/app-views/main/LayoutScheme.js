import React, { useState } from 'react';
import './style/LayoutScheme.css';

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
    <div className="layout-scheme-container">
      <h2>Планировщик зала</h2>
      <div className="controls">
        <button onClick={handleSave}>Сохранить расстановку</button>
        <label className="upload-btn">
          Загрузить расстановку
          <input type="file" accept=".json" onChange={handleLoad} />
        </label>
      </div>
      <div className="layout-content">
        <div className="objects-panel">
          <h3>Объекты</h3>
          {objects.map((obj) => (
            <div
              key={obj.id}
              className="object-item"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('object', JSON.stringify(obj));
              }}
            >
              <img src={obj.image} alt={obj.name} className="object-image" />
              <p>{obj.name}</p>
            </div>
          ))}
        </div>
        <div
          className="board"
          onDrop={(e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData('object');
            if (data) {
              try {
                const obj = JSON.parse(data);
                const boardRect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - boardRect.left;
                const y = e.clientY - boardRect.top;
                console.log('Dropped at:', x, y);
                setPlacedObjects([...placedObjects, { ...obj, x, y }]);
              } catch (error) {
                console.error('Error parsing object:', error);
              }
            }
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          {placedObjects.map((placed, index) => (
            <div
              key={`${placed.id}-${index}`}
              className="placed-object"
              style={{ left: `${placed.x}px`, top: `${placed.y}px`, position: 'absolute' }}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('index', index);
              }}
              onDragEnd={(e) => {
                const boardRect = e.currentTarget.parentElement.getBoundingClientRect();
                const newX = e.clientX - boardRect.left;
                const newY = e.clientY - boardRect.top;
                console.log('Drag end at:', newX, newY);
                const newObjects = [...placedObjects];
                newObjects[index] = { ...newObjects[index], x: newX, y: newY };
                setPlacedObjects(newObjects);
              }}
            >
              <img src={placed.image} alt={placed.name} className="object-image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LayoutScheme;
