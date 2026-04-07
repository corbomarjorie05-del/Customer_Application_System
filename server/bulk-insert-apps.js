const pool = require('./config/db');

const appsData = [
    ["Credit Card", "$2,000", "Entry-level card for daily expenses; applicant has 1 year of work experience."],
    ["Personal Loan", "$5,000", "मेडिकल expenses; repayment term 24 months."],
    ["Auto Loan", "$18,000", "Used car purchase; 5-year term."],
    ["Mortgage", "$120,000", "First home purchase; 20% down payment."],
    ["Business Loan", "$50,000", "Startup capital for small café."],
    ["Credit Card", "$3,500", "Balance transfer request; good credit score."],
    ["Personal Loan", "$10,000", "Home renovation; 36-month repayment."],
    ["Auto Loan", "$25,000", "New car financing; stable income."],
    ["Mortgage", "$200,000", "Condo purchase; dual-income applicants."],
    ["Business Loan", "$75,000", "Inventory expansion for retail store."],
    ["Credit Card", "$1,500", "Student applicant; part-time income."],
    ["Personal Loan", "$7,500", "Debt consolidation."],
    ["Auto Loan", "$30,000", "SUV purchase; 6-year term."],
    ["Mortgage", "$350,000", "Family home upgrade."],
    ["Business Loan", "$120,000", "Equipment purchase for manufacturing."],
    ["Credit Card", "$4,000", "Travel rewards card request."],
    ["Personal Loan", "$3,000", "Emergency fund coverage."],
    ["Auto Loan", "$12,000", "Motorcycle financing."],
    ["Mortgage", "$90,000", "Rural property purchase."],
    ["Business Loan", "$40,000", "Online business expansion."],
    ["Credit Card", "$6,000", "High-limit card for frequent traveler."],
    ["Personal Loan", "$15,000", "Wedding expenses."],
    ["Auto Loan", "$22,000", "Sedan purchase; 4-year term."],
    ["Mortgage", "$500,000", "Investment property."],
    ["Business Loan", "$200,000", "Franchise purchase."],
    ["Credit Card", "$2,500", "Cashback card application."],
    ["Personal Loan", "$8,000", "Medical procedure financing."],
    ["Auto Loan", "$28,000", "Electric vehicle purchase."],
    ["Mortgage", "$275,000", "Townhouse acquisition."],
    ["Business Loan", "$60,000", "Marketing campaign funding."],
    ["Credit Card", "$7,500", "Premium card request."],
    ["Personal Loan", "$20,000", "Education expenses."],
    ["Auto Loan", "$16,000", "Compact car purchase."],
    ["Mortgage", "$180,000", "First-time buyer program."],
    ["Business Loan", "$90,000", "Restaurant renovation."],
    ["Credit Card", "$1,000", "Secured card application."],
    ["Personal Loan", "$12,000", "Home improvement."],
    ["Auto Loan", "$35,000", "Luxury car financing."],
    ["Mortgage", "$600,000", "High-value property purchase."],
    ["Business Loan", "$300,000", "Large-scale expansion."],
    ["Credit Card", "$5,500", "Business credit card."],
    ["Personal Loan", "$6,500", "Moving expenses."],
    ["Auto Loan", "$14,000", "Used car replacement."],
    ["Mortgage", "$220,000", "Suburban home purchase."],
    ["Business Loan", "$110,000", "Warehouse lease and setup."],
    ["Credit Card", "$8,000", "High-income applicant."],
    ["Personal Loan", "$9,000", "Travel and relocation."],
    ["Auto Loan", "$40,000", "Pickup truck purchase."],
    ["Mortgage", "$750,000", "Luxury home financing."],
    ["Business Loan", "$500,000", "Tech startup funding."]
];

async function insertAll() {
    try {
        const userId = 1; // ID for ohaha@gmail.com
        console.log(`Starting bulk insert for user ID ${userId}...`);

        for (const [type, amount, details] of appsData) {
            const cleanAmount = amount.replace('$', '').replace(',', '');
            const data_json = JSON.stringify({
                details: details,
                amount: cleanAmount
            });

            await pool.query(
                'INSERT INTO applications (user_id, app_type, status, data_json) VALUES (?, ?, ?, ?)',
                [userId, type, 'pending', data_json]
            );
        }

        console.log('Successfully inserted all 50 applications!');
    } catch (error) {
        console.error('Error during bulk insert:', error.message);
    } finally {
        process.exit();
    }
}

insertAll();
