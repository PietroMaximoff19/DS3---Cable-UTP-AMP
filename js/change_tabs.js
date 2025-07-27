// Funciones para la galería de imágenes
function viewImage(src) {
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  
  if (modal && modalImage) {
    modalImage.src = src;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function toExchangeImage(imgElement) {
  const mainImage = document.getElementById('img_main');
  if (mainImage) {
    mainImage.src = imgElement.src;
  }
}

function closeModal() {
  const modal = document.getElementById('image-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Funcionalidad de cambio de pestañas
document.addEventListener('DOMContentLoaded', function() {
  const productTab = document.getElementById('product-tab');
  const imagesTab = document.getElementById('images-tab');
  const informationSection = document.getElementById('information-section');
  const imagesSection = document.getElementById('images-section');

  if (productTab && imagesTab && informationSection && imagesSection) {
    // Función para cambiar a la pestaña de producto
    function showProductTab() {
      productTab.classList.remove('bg-gray-100', 'text-gray-700');
      productTab.classList.add('bg-blue-600', 'text-white');
      
      imagesTab.classList.remove('bg-blue-600', 'text-white');
      imagesTab.classList.add('bg-gray-100', 'text-gray-700');
      
      informationSection.classList.remove('hidden');
      imagesSection.classList.add('hidden');
    }

    // Función para cambiar a la pestaña de imágenes
    function showImagesTab() {
      imagesTab.classList.remove('bg-gray-100', 'text-gray-700');
      imagesTab.classList.add('bg-blue-600', 'text-white');
      
      productTab.classList.remove('bg-blue-600', 'text-white');
      productTab.classList.add('bg-gray-100', 'text-gray-700');
      
      imagesSection.classList.remove('hidden');
      informationSection.classList.add('hidden');
    }

    // Event listeners
    productTab.addEventListener('click', showProductTab);
    imagesTab.addEventListener('click', showImagesTab);

    // Cerrar modal con Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    // Cerrar modal haciendo clic fuera de la imagen
    const modal = document.getElementById('image-modal');
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeModal();
        }
      });
    }
  }
});
