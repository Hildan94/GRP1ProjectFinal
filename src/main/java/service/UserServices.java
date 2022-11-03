package service;

import DB.HibernateController;
import DB.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

public class UserServices {
    HibernateController hibernateController = new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg");

    void fetch() {
        SessionFactory sessionFactory = hibernateController.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        User user = new User();
        System.out.print("UserID before commit: " + user.getId());
        user.setUsername("BenteBent");
        session.persist(user);
        transaction.commit();
        System.out.println("UserID after commit: " + user.getId());
        Transaction readTransaction = session.beginTransaction();
        User readUser = session.get(User.class, user.getId());
        System.out.println("Read user back: " + readUser.toString());
        readTransaction.commit();
        session.close();
    }
}
