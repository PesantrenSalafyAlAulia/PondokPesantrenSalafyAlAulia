document.addEventListener('DOMContentLoaded', function() {
    // Data for program cards
    const programData = [
        {
            id: 'shorof',
            title: 'Shorof',
            icon: 'fas fa-book-open',
            description: 'Ilmu yang mempelajari perubahan bentuk kata dalam bahasa Arab untuk mengetahui makna yang berbeda dari akar kata yang sama.',
            items: [
                { name: 'Amtsilat Tashrifiyah', level: 'Dasar', badgeClass: 'bg-success' },
                { name: 'Matan Bina', level: 'Dasar', badgeClass: 'bg-primary' },
                { name: 'Kailani', level: 'Menengah', badgeClass: 'bg-info' },
                { name: 'Lamiyatul Af\'al', level: 'Lanjutan', badgeClass: 'bg-secondary' }
            ]
        },
        {
            id: 'hadits',
            title: 'Hadits',
            icon: 'fas fa-book',
            description: 'Ilmu yang mempelajari perkataan, perbuatan, dan ketetapan Nabi Muhammad SAW sebagai sumber hukum Islam kedua setelah Al-Qur\'an.',
            items: [
                { name: 'Arba\'in Nawawi', level: 'Dasar', badgeClass: 'bg-success' },
                { name: 'Bulughul Maram', level: 'Menengah', badgeClass: 'bg-info' },
                { name: 'Riyadhus Shalihin', level: 'Menengah', badgeClass: 'bg-info' },
                { name: 'Shahih Bukhari & Muslim', level: 'Lanjutan', badgeClass: 'bg-secondary' }
            ]
        },
        {
            id: 'mustholah-hadits',
            title: 'Mustholah Hadits',
            icon: 'fas fa-search',
            description: 'Ilmu yang mempelajari kaidah-kaidah untuk mengetahui kondisi sanad dan matan hadits dari segi diterima atau ditolaknya.',
            items: [
                { name: 'Nukhbatul Fikar', level: 'Menengah', badgeClass: 'bg-info' },
                { name: 'Tadribul Rawi', level: 'Lanjutan', badgeClass: 'bg-secondary' }
            ]
        },
        {
            id: 'tafsir',
            title: 'Tafsir',
            icon: 'fas fa-quran',
            description: 'Ilmu yang mempelajari penjelasan dan penafsiran ayat-ayat Al-Qur\'an untuk memahami makna dan kandungannya.',
            items: [
                { name: 'Tafsir Jalalain', level: 'Menengah', badgeClass: 'bg-info' },
                { name: 'Tafsir Munir', level: 'Lanjutan', badgeClass: 'bg-secondary' }
            ]
        },
        {
            id: 'mantiq',
            title: 'Mantiq',
            icon: 'fas fa-brain',
            description: 'Ilmu logika yang mempelajari metode berpikir yang benar dan sistematis untuk mencapai kesimpulan yang valid.',
            items: [
                { name: 'Sullam al-Munawraq', level: 'Lanjutan', badgeClass: 'bg-secondary' }
            ]
        },
        {
            id: 'balaghah',
            title: 'Balaghah',
            icon: 'fas fa-feather-alt',
            description: 'Ilmu yang mempelajari cara menyampaikan ungkapan yang fasih dan jelas sesuai dengan situasi dan kondisi.',
            items: [
                { name: 'Jauharul Maknun', level: 'Lanjutan', badgeClass: 'bg-secondary' }
            ]
        },
        {
            id: 'munadzoroh',
            title: 'Munadzoroh',
            icon: 'fas fa-comments',
            description: 'Ilmu yang mempelajari metode diskusi dan debat ilmiah dengan etika dan argumentasi yang baik.',
            items: [
                { name: 'Kitab Waladiyah', level: 'Menengah', badgeClass: 'bg-info' },
                { name: 'Adabul Bahts wal Munadzoroh', level: 'Lanjutan', badgeClass: 'bg-secondary' }
            ]
        }
    ];

    // Function to create program card HTML
    function createProgramCard(program) {
        let itemsHtml = '';
        program.items.forEach((item, index) => {
            const isLast = index === program.items.length - 1;
            itemsHtml += `
                <li class="list-group-item d-flex justify-content-between align-items-center p-3 border-0 ${!isLast ? 'border-bottom' : ''}">
                    <div class="d-flex align-items-center">
                        <span class="badge ${item.badgeClass} rounded-circle me-2" style="width: 8px; height: 8px; padding: 0;"></span>
                        <span>${item.name}</span>
                    </div>
                    <span class="badge ${item.badgeClass} rounded-pill px-3">${item.level}</span>
                </li>
            `;
        });

        return `
            <div class="card h-100 program-card">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <div class="icon-circle bg-success text-white me-3">
                            <i class="${program.icon}"></i>
                        </div>
                        <h4 class="card-title text-success mb-0">${program.title}</h4>
                    </div>
                    <p class="card-text mb-3">
                        ${program.description}
                    </p>
                    <ul class="list-group list-group-flush">
                        ${itemsHtml}
                    </ul>
                </div>
            </div>
        `;
    }

    // Update program cards
    programData.forEach(program => {
        const cardContainer = document.querySelector(`[data-program-id="${program.id}"]`);
        if (cardContainer) {
            cardContainer.innerHTML = createProgramCard(program);
        }
    });
});