// Tombol Share ke WhatsApp
   const menuBtn = document.querySelector('.menu-share');
    const dropdown = document.getElementById('shareDropdown');

    menuBtn.addEventListener('click', () => {
        dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
    });

    function shareTo(platform) {
        const url = encodeURIComponent(window.location.href);
        let shareURL = "";

        switch (platform) {
            case 'whatsapp':
                shareURL = `https://wa.me/?text=${url}`;
                break;
            case 'facebook':
                shareURL = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareURL = `https://twitter.com/intent/tweet?url=${url}`;
                break;
            case 'telegram':
                shareURL = `https://t.me/share/url?url=${url}`;
                break;
            case 'instagram':
                alert("Instagram tidak mendukung share langsung. Link disalin ke clipboard!");
                navigator.clipboard.writeText(window.location.href);
                return;
            case 'copy':
                navigator.clipboard.writeText(window.location.href).then(() => {
                    const copyBtn = document.querySelector('a[onclick*="copy"] i');
                    const originalIcon = copyBtn.className;
                    copyBtn.className = "ri-check-line";
                    setTimeout(() => {
                copyBtn.className = originalIcon;
            }, 1500);
    });
    return;

        }

        window.open(shareURL, '_blank');
        dropdown.style.display = 'none';
    }

    document.addEventListener('click', function (event) {
        if (!menuBtn.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });



  // Fungsi Copy Link + Tampilkan Popup
  const toast = document.getElementById('copy-toast');

  function showToast(message) {
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
          toast.classList.remove('show');
      }, 2000);
  }

  document.querySelectorAll('.list-menu').forEach(menu => {
      const copyBtn = menu.querySelector('.copy');
      const linkHref = menu.getAttribute('href');

      copyBtn.addEventListener('click', function (e) {
          e.preventDefault(); // jangan redirect
          navigator.clipboard.writeText(linkHref)
              .then(() => {
                  showToast('Copied ✅');
              })
              .catch(err => {
                  showToast('Gagal menyalin ❌');
                  console.error(err);
              });
      });
  });