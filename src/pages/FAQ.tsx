import { useEffect, useState } from "react";
import http from "../utils/http.ts";
import {Faqs} from "../types/faq.type.ts";

function FAQ() {
    const [faqs, setFaqs] = useState<Faqs[]>([]);
    const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

    function scrollToTop(): void{
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        scrollToTop();
        const fetchFAQs = async () => {
            try {
                const response = await http.get('/faqs');
                if (response.data && response.data.result) {
                    setFaqs(response.data.result);
                }
            } catch (error) {
                console.error("Error fetching FAQs:", error);
            }
        };

        fetchFAQs();
    }, []);

    const toggleFAQ = (index: number) => {
        setOpenFAQIndex(openFAQIndex === index ? null : index); // Đổi trạng thái mở
    };

    return (
        <>
            <h2 className="text-center text-3xl text-[#FFA726] font-bold mt-40">
                Câu hỏi thường gặp khi mua sắm tại Furni Luxury
            </h2>
            <div className="w-[20rem] h-[3px] bg-[#FFA726] mx-auto my-4"></div>

            <div className="flex flex-col items-center pb-60 mt-7 space-y-8 max-w-2xl mx-auto">
                {faqs.map((faq, index) => (
                    <div key={faq.id} className="w-full">
                        <div
                            onClick={() => toggleFAQ(index)}
                            className="flex justify-between items-center cursor-pointer p-4 border border-gray-300 rounded-md"
                        >
                            <h3 className="text-xl font-bold text-gray-800">
                                {faq.question}
                            </h3>
                            <span className={`transform transition-transform ${openFAQIndex === index ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </div>
                        {openFAQIndex === index && ( // Hiển thị câu trả lời nếu câu hỏi đang mở
                            <p className="text-md text-gray-600 mt-2 pl-4">
                                {faq.answer}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default FAQ;
