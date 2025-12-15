import React, { useState } from 'react';
import { Star, MessageSquare, PlusCircle } from 'lucide-react';
import { SECTION_ID, Review } from '../types';
import { INITIAL_REVIEWS } from '../constants';

const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const review: Review = {
      id: Date.now().toString(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: 'agora mesmo'
    };

    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '' });
    setShowForm(false);
    alert('Valeu pelo feedback! Sua avaliação foi publicada.');
  };

  return (
    <section id={SECTION_ID.REVIEWS} className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl text-street-900 uppercase tracking-tighter mb-4">
            A Voz da Galera
          </h2>
          <div className="w-20 h-1 bg-street-accent mx-auto mb-6"></div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Confira o que quem já comprou está falando sobre os produtos e atendimento da Via Surf.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="bg-slate-50 p-8 rounded-2xl relative border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute -top-4 -left-4 bg-street-accent text-white p-3 rounded-xl rotate-[-6deg]">
                <MessageSquare size={24} fill="currentColor" />
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6 leading-relaxed">"{review.comment}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-street-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-street-900 text-sm">{review.name}</h4>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          {!showForm ? (
            <button 
              onClick={() => setShowForm(true)}
              className="group bg-street-900 text-white px-8 py-4 font-bold uppercase tracking-wider rounded-lg hover:bg-street-accent transition-all flex items-center gap-2 mx-auto"
            >
              <PlusCircle size={20} />
              Avaliar Produto
            </button>
          ) : (
            <div className="max-w-lg mx-auto bg-white border-2 border-slate-100 p-8 rounded-xl shadow-xl text-left animate-fade-in-up">
              <h3 className="font-display font-bold text-2xl mb-6">Deixe seu Drop</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Seu Nome</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:border-street-accent"
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Avaliação</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({...newReview, rating: star})}
                        className="focus:outline-none"
                      >
                        <Star 
                          size={28} 
                          className={`${star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 hover:text-yellow-200'}`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Comentário</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:border-street-accent"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  ></textarea>
                </div>
                <div className="flex gap-4 pt-2">
                  <button 
                    type="submit"
                    className="flex-1 bg-street-accent text-white py-3 rounded-lg font-bold uppercase hover:bg-orange-600 transition-colors"
                  >
                    Publicar
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;