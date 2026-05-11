import tabbyLogo from '../assets/tabby-logo.png';

export function TabbyPayment() {
    return (
        <section className="py-16 bg-white border-t border-gray-200">
            <div className="max-w-[1200px] mx-auto px-8">
                <div className="text-center">
                    <h2 className="mb-6 text-2xl md:text-3xl text-[var(--color-navy)] tracking-tight font-medium">
                        Flexible Payment Options
                    </h2>
                    <p className="text-base text-[var(--color-navy)]/70 mb-8 max-w-[600px] mx-auto">
                        We accept Tabby - Flexible payment options
                    </p>

                    <div className="flex justify-center">
                        <img
                            src={tabbyLogo}
                            alt="Tabby Payment"
                            className="h-16 w-auto"
                        />

                    </div>
                </div>
            </div>
        </section>
    );
}
