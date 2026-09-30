import Content from '../components/Content';
import usePage from '@/hooks/usePage';
import styles from './About.module.scss';

const About = () => {
	const page = usePage('about');
	return (
		<div>
			<Content
				title={page.heading ?? undefined}
				text={
					<span className={styles.profile}>
						{page.image && <img className={styles.photo} src={page.image} alt={page.imageAlt ?? ''} />}
						{page.paragraphs.map((paragraph, index) => (
							<span key={index}>
								{index > 0 && <br />}
								{paragraph.lead && <><strong>{paragraph.lead}</strong> </>}
								{paragraph.body}
							</span>
						))}
					</span>
				}
			/>
		</div>
	);
};

export default About;