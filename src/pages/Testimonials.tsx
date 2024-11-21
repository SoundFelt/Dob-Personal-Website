import Marquee from 'react-fast-marquee';
import { IoMusicalNote } from "react-icons/io5";
import { useWindowSize } from '../hooks/useWindowSize';

const Testimonials = ({ width }: { width: number }) => {
    const windowSize = useWindowSize();

    const TESTIMONIALS = [
        {
            text: 'The attention to detail is paramount and the pitfalls are all too obvious but they present no problem for Tsenov, for whom the music is demonstrably in his blood; thus we are treated to a truly great set of interpretations which fully comply with the huge demands on the pianist to accurately reflect all the nuances within this brilliant music.',
            author: 'Steve Arloff'
        },
        {
            text: '"Pianist Dobromir Tsenov imbues each and every selection with idiomatic perception, striking a natural balance between vocally informed and percussive phrases, and perfectly capturing the music’s divergent moods. The pianist’s extensive and scholarly notes further demonstrate his deep commitment to this repertoire."',
            author: 'Jed Distler'
        },
        {
            text: '"The Bulgarian pianist Dobromir Tsenov is an impressive young performer with a very fine technique and pronounced rhythmic skills. These pieces would be quite a challenge, even if the rhythms are part of one\'s national heritage. Tsenov\'s commitment, stylish playing and clarity of execution are outstanding."',
            author: 'Geoff Pearce'
        },
        {
            text: '"Dobromir Tsenov\'s affinity with the music of Pancho and Alexander Vladigerov is entirely authoritative. Tsenov combines dazzling virtuosity with an ability to draw the listener into this sound world; one cannot fail to be utterly absorbed by this recording, bringing to life and championing this seldom heard music in style."',
            author: 'Daniel Browell'
        },

    ]

  return (
      <div style={{ marginTop: '80px',}}>
        <div style={{ margin: windowSize.width < 800 ? '0 25px 50px' : '0 50px 50px'}}>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center', position: 'relative', }}>
                <span
                    style={{
                        fontSize: '40px',
                        fontWeight: '400',
                        bottom: '-5px',
                        position: 'absolute',
                        letterSpacing: '-2px',
                        left: 0
                    }}
                >
                    Reviews
                </span>
            </div>
            <div style={{ width: '100%', height: '0.5px', backgroundColor: 'rgb(70, 70, 70)' }} />
        </div>
        <Marquee gradient={width >= 768} pauseOnHover gradientWidth={400} gradientColor='#f4f4f5' autoFill speed={25}>
            {TESTIMONIALS.map((testimonial, index) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div key={index} style={{ display: 'flex', flexDirection: 'column',  maxWidth: width >= 768 ? '600px' : '300px', alignItems: 'flex-end'}}>
                        <p style={{ margin: 0, fontStyle: 'italic', fontSize: width >= 768 ? '18px' : '16px', fontWeight: '300'}}>{testimonial.text}</p>
                        <p style={{ marginBottom: 0, fontSize: width >= 768 ? '16px' : '14px', fontWeight: '400'}}>- {testimonial.author}</p>
                    </div>
                    <IoMusicalNote style={{ fontSize: '30px', color: 'rgb(0, 0, 0)', margin: '0 60px'}}/>
                </div>
            ))}
        </Marquee>
      </div>
  )
}

export default Testimonials